import { Tables } from "@/supabase/types"
import { OpenAI } from "openai"

export async function handleTekmetricsAPIRequest(
  userIntent: string,
  profile: Tables<"profiles"> & {
    tekmetrics_client_id: string | null
    tekmetrics_client_secret: string | null
  }
): Promise<string> {
  const openaiInstance = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ""
  })

  const generateAPIRequest = async (userIntent: string): Promise<any> => {
    const response = await openaiInstance.completions.create({
      model: "gpt-3.5-turbo",
      prompt: userIntent,
      max_tokens: 60
    })

    const apiRequest = response.choices[0].text
    return parseAPIRequest(apiRequest)
  }

  const processAPIResponse = async (apiResponse: any): Promise<string> => {
    const response = await openaiInstance.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `The API response is: ${JSON.stringify(apiResponse)}`,
      max_tokens: 60
    })

    return response.choices[0].text
  }

  const apiRequest = await generateAPIRequest(userIntent)
  const apiResponse = await makeAPIRequest(apiRequest, profile)
  const processedResponse = await processAPIResponse(apiResponse)

  return processedResponse
}

async function makeAPIRequest(
  apiRequest: any,
  profile: Tables<"profiles"> & {
    tekmetrics_client_id: string | null
    tekmetrics_client_secret: string | null
  }
): Promise<any> {
  const response = await fetch(
    "https://sandbox.tekmetric.com/api/v1/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${profile.tekmetrics_client_id || ""}:${profile.tekmetrics_client_secret || ""}`
        ).toString("base64")}`
      },
      body: "grant_type=client_credentials"
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`)
  }

  const data = await response.json()
  const accessToken = data.access_token

  const apiResponse = await fetch(
    `https://sandbox.tekmetric.com/api/v1/${apiRequest.endpoint}`,
    {
      method: apiRequest.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(apiRequest.body || {})
    }
  )

  if (!apiResponse.ok) {
    throw new Error(`HTTP error ${apiResponse.status}`)
  }

  return await apiResponse.json()
}

function parseAPIRequest(apiRequest: string): {
  endpoint: string
  method: string
  body?: any
} {
  const lines = apiRequest.split("\n")
  const [method, endpoint] = lines[0].trim().split(" ")
  const bodyLines = lines.slice(1).filter(line => line.trim() !== "")
  const body =
    bodyLines.length > 0 ? JSON.parse(bodyLines.join("\n")) : undefined

  return { endpoint, method, body }
}

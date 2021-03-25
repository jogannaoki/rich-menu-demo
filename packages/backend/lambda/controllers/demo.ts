import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import fetch from 'node-fetch'

export type LambdaEvent = APIGatewayProxyEvent & {
  requestContext: {
    authorizer: {
      lineUserId: string
    }
  }
}

export const handler = async (event: LambdaEvent): Promise<APIGatewayProxyResult> => {
  console.log('event: ', JSON.stringify(event, null, 2))
  const lineUserId = event.requestContext.authorizer.lineUserId

  const richMenu = process.env.AFTER_REGISTRATION_RICH_MENU_ID
  const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN

  try {
    await fetch(`https://api.line.me/v2/bot/user/${lineUserId}/richmenu/${richMenu}`, {
      method: 'POST',
      body: '{}',
      headers: {
        Authorization: `Bearer ${channelAccessToken}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.log(err.toString())
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({}),
  }
}

#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { BackendStack } from '../lib/backend-stack'
import { join } from 'path'

const lambdaLayerDir = join(process.cwd(), '../backend/dist/layer')
const lambdaCodeDir = join(process.cwd(), '../backend/lambda')

const clientId = process.env.CLIENT_ID
if (!clientId) {
  throw new Error('Required environment variable CLIENT_ID is not set.')
}

const afterRegistrationRichMenuId = process.env.AFTER_REGISTRATION_RICH_MENU_ID
if (!afterRegistrationRichMenuId) {
  throw new Error('Required environment variable AFTER_REGISTRATION_RICH_MENU_ID is not set.')
}

const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN
if (!channelAccessToken) {
  throw new Error('Required environment variable CHANNEL_ACCESS_TOKEN is not set.')
}

const app = new cdk.App()
new BackendStack(app, 'BackendStack', {
  env: { region: 'ap-northeast-1' },
  clientId,
  afterRegistrationRichMenuId,
  channelAccessToken,
  lambdaLayerDir,
  lambdaCodeDir,
})

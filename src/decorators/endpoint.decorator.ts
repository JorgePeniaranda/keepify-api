import { applyDecorators, HttpCode, type Type } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiProduces,
  ApiResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

export const ENDPOINT_INFO = ({
  auth = true,
  status = 200,
  description = 'Success',
  response,
  body,
  isArray = false,
  produces = 'application/json'
}: {
  auth?: boolean
  status?: number
  description?: string
  response?: Type<unknown> | string
  body?: Type<unknown> | string
  isArray?: boolean
  produces?: string
}): any => {
  const decorators = []

  if (body !== undefined) {
    decorators.push(ApiBody({ type: body }))
  }

  if (auth) {
    decorators.push(ApiBearerAuth())
    // decorators.push(UseGuards(JwtAuthGuard))
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'No Authenticated'
      })
    )
  }

  if (!auth) {
    // decorators.push(Public())
  }

  decorators.push(ApiProduces(produces))
  decorators.push(ApiResponse({ status, description, type: response, isArray }))
  decorators.push(
    ApiNotFoundResponse({
      description: 'Not Found'
    })
  )
  decorators.push(HttpCode(status))

  return applyDecorators(...decorators)
}
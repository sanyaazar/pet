import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Response } from 'express';
import { ChangeProfileBodyDTO } from 'src/types';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({
    tags: ['Profile'],
    summary: 'Get own profile',
    description: 'User get his/her own profile',
  })
  @HttpCode(HttpStatus.OK)
  async getProfile(@Res() res: Response) {
    // return my profile
    return res.sendStatus(200);
  }

  @ApiOperation({
    tags: ['Profile'],
    summary: 'Edit profile information',
    description: 'User can edits telephone, date of birth and display name.',
    requestBody: {
      description: 'User data to change',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ChangeProfileBodyDTO',
          },
        },
      },
    },
  })
  @ApiBody({
    type: ChangeProfileBodyDTO,
    examples: {
      example1: {
        value: {
          login: 'ivanov',
          tel: '+79991234567',
        },
      },
      example2: {
        value: {
          login: 'ivanov',
          tel: '+79991234567',
          dateOfBirth: '01.01.2003',
        },
      },
      example3: {
        value: {
          login: 'ivanov',
          tel: '+79991234567',
          dateOfBirth: '01.01.2003',
          displayName: 'Ivan Ivanov',
        },
      },
    },
  })
  @Put()
  async changeProfileData(
    @Body() body: ChangeProfileBodyDTO,
    @Res() res: Response,
  ) {
    const { login, ...params } = body;
    return res.status(200).send(params);
  }
}

import { Body, Controller, Get, Patch, Post, Query, Param, UseGuards } from '@nestjs/common';
import { CreateFormDto } from './dtos/create-form.dto';
import { FormService } from './form.service';
import { AuthGuard } from './../auth/auth.guard';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FillFormDto } from './dtos/fill-form.dto';

@Controller('v1')
@UseGuards(AuthGuard)
@ApiTags('v1')
@ApiBearerAuth()
export class FormController {

    constructor(private formService: FormService) {}

    /**
     * Create a new form
     * @param CreateFormDto Data for creating the form
     * @returns The created form
     */
    @Post('form')
    @ApiBody({ description: 'Data for creating the form', type: CreateFormDto })
    @ApiResponse({ status: 201, description: 'Form created successfully.' })
    createForm(@Body() body) {
        return this.formService.createForm(body);
    }

    /**
     * Fill dynamic form
     * @param id The ID of the form to update
     * @param UpdateFormDto Data for updating the form
     * @returns The updated form
     */
    @Post('fill_data')
    @ApiBody({ description: 'Data for fill form', type: FillFormDto })
    @ApiResponse({ status: 200, description: 'Form filled successfully.' })
    updateForm(@Query('form_title') title: string, @Body() body: FillFormDto) {
        return this.formService.fillForm(title, body);
    }

    /**
     * Retrieve form values
     * @returns List of form rows
     */
    @Get('fill_data')
    @ApiResponse({ status: 200, description: 'List of form retrieved successfully.' })
    getForms(@Query('form_title') title) {
        return this.formService.getFormValues(title);

    }
}

import { Body, Controller, Get, Patch, Post, Query, Param, UseGuards } from '@nestjs/common';
import { UpdateFormDto } from './dtos/update-form.dto';
import { CreateFormDto } from './dtos/create-form.dto';
import { FormService } from './form.service';
import { AuthGuard } from './../auth/auth.guard';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

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
    createForm(@Body() body: CreateFormDto) {
        return this.formService.createForm(body);
    }

    /**
     * Update an existing form
     * @param id The ID of the form to update
     * @param UpdateFormDto Data for updating the form
     * @returns The updated form
     */
    @Patch('fill_data/:id')
    @ApiParam({ name: 'id', description: 'The ID of the form to update' })
    @ApiBody({ description: 'Data for updating the user', type: UpdateFormDto })
    @ApiResponse({ status: 200, description: 'Form updated successfully.' })
    updateForm(@Param('id') id: string, @Body() body: UpdateFormDto) {
        return this.formService.updateForm(parseInt(id), body);
    }

    /**
     * Retrieve form
     * @returns List of form
     */
    @Get('fill_data')
    @ApiResponse({ status: 200, description: 'List of form retrieved successfully.' })
    getForms(@Query('form_title') title) {
        return this.formService.getForms(title);

    }
}

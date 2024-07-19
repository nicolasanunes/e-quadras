import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserTypeEnum } from 'src/users/enums/user-type.enum';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ListCompanyDto } from './dto/list-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Post()
  createCompany(
    @Body() createCompany: CreateCompanyDto,
  ): Promise<CreateCompanyDto> {
    return this.companyService.createCompany(createCompany);
  }

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Get()
  async listAllCompanies(): Promise<ListCompanyDto[]> {
    return (await this.companyService.listAllCompanies()).map(
      (company) => company,
    );
  }

  @Roles(UserTypeEnum.Root)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  // Inicialmente update do nome, posteriormente adicionar a imagem de perfil
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompany: UpdateCompanyDto,
  ): Promise<UpdateCompanyDto> {
    return this.companyService.updateCompany(id, updateCompany);
  }
}

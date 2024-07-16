import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entity/company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ListCompanyDto } from './dto/list-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async createCompany(
    createCompanyDto: CreateCompanyDto,
  ): Promise<CreateCompanyDto> {
    const company = new CompanyEntity();

    Object.assign(company, createCompanyDto as CompanyEntity);

    return this.companyRepository.save(company);
  }

  async listAllCompanies(): Promise<ListCompanyDto[]> {
    return this.companyRepository.find();
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateCompanyDto> {
    const updatedCompany = await this.companyRepository.findOneBy({ id });

    if (updatedCompany === null) {
      throw new NotFoundException('Empresa não encontrada!');
    }

    Object.assign(updatedCompany, updateCompanyDto as CompanyEntity);

    return this.companyRepository.save(updatedCompany);
  }
}
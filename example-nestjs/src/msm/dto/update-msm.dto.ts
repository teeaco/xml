import { PartialType } from '@nestjs/mapped-types';
import { CreatemsmDto } from './create-msm.dto';

export class UpdatemsmDto extends PartialType(CreatemsmDto) {}

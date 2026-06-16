import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

/** The payload returned by the liveness probe. */
interface HealthStatus {
  status: 'ok';
  uptime: number;
}

/** Liveness probe controller. */
@ApiTags('health')
@Controller('health')
export class HealthController {
  /**
   * Reports service liveness and process uptime.
   * @returns A static health payload.
   */
  @ApiOkResponse({ description: 'The service is alive.' })
  @Get()
  public check(): HealthStatus {
    return { status: 'ok', uptime: process.uptime() };
  }
}

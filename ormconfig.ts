import { ApplicationConfigService as ConfigService } from "./src/shared/config";
import { CustomInjector } from "./src/shared/injector";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();
const injector: CustomInjector = CustomInjector.getInstance();
const configServie: ConfigService = injector.resolve<ConfigService>(ConfigService);
const connctionSource = new DataSource(configServie.dataSource);
export default connctionSource;

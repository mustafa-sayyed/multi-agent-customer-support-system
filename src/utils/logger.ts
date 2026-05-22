import { consola } from "consola";

class Logger {

    info(message: string, data?: any) {
        consola.info(message, data);
    }

    error(message: string, error?: Error | unknown) {
        consola.error(message, error);
    }

    warn(message: string, data?: any) {
        consola.warn(message, data);
    }

    success(message: string, data?: any) {
        consola.success(message, data   );
    }
}

export const logger = new Logger();
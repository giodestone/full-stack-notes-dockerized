/**
 * Provides a wrapper around the required connection information for a database.
 */
export class DatabaseConnectionInfo {
    private user: string|undefined;
    private password: string|undefined;
    private host: string|undefined;
    private port: number|undefined;
    private database: string|undefined;

    /**
     * Automatically retrieves the database config.
     * 
     * @param shouldThrowIfError Whether exceptions should be thrown if any of the params are incorrectly configured.
     * 
     * @remarks dotenv must be configured beforehand, if being used.
     */
    public constructor(shouldThrowIfError: boolean = true) {
        this.setupDetailsFromProcess();
        if (shouldThrowIfError)
            this.confirmSetupDetailsOk();
    }

    /**
     * Get a connection URI in postgres format. `postgres://user:pass@example.com:5432/dbname`
     */
    public getPostgresConnectionURI(): string {
        // Format: postgres://user:pass@example.com:5432/dbname

        return `postgres://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
    }
    
    /**
     * Get the details for the class from defined variables using `process.env`.
     * @remarks Dotenv must be configured beforehand.
     */
    private setupDetailsFromProcess(): void {
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.host = process.env.DB_HOST;
        this.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
        this.database = process.env.DB_NAME;
    }

    /**
     * Run a check that confirms if all the retrieved values are defined.
     */
    private confirmSetupDetailsOk(): void {
        if (typeof this.user == "undefined")
            throw new Error("user is undefined. Unable to get from environment. Check if value is set in envrionment or being correctly retrieved.");
        if (typeof this.password == "undefined")
            throw new Error("password is undefined. Unable to get from environment. Check if value is set in envrionment or being correctly retrieved.");
        if (typeof this.host == "undefined")
            throw new Error("host is undefined. Unable to get from environment. Check if value is set in envrionment or being correctly retrieved.");
        if (typeof this.port == "undefined")
            throw new Error("port is undefined. Unable to get from environment. Check if value is set in envrionment, a numerical value is being set, or being correctly retrieved.");
        if (typeof this.database == "undefined")
            throw new Error("database is undefined. Unable to get from environment. Check if value is set in envrionment or being correctly retrieved.");
    }
}
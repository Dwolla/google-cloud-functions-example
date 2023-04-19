import {HttpFunction} from "@google-cloud/functions-framework"
import {Client as DwollaClient} from "dwolla-v2";

const envVar = <T = unknown>(name: string): T => process.env[name] as T;

const dwollaClient = new DwollaClient({
    environment: envVar("DWOLLA_API_ENVIRONMENT"),
    key: envVar("DWOLLA_API_KEY"),
    secret: envVar("DWOLLA_API_SECRET")
});

export const fetchCustomers: HttpFunction = async (req, res) => {
    try {
        const response = await dwollaClient.get("customers");
        return res.status(200).json(response.body);
    } catch (e) {
        console.error("Failed to fetch Dwolla customers", e);
    }
}
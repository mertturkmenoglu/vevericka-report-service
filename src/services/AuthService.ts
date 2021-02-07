import axios from "axios";
import Log from "../helpers/Log";

export class AuthService {
    private static readonly URL = "https://vevericka-auth-service.herokuapp.com";
    private static readonly TAG = "[AuthService]";

    static async isAdmin(token): Promise<boolean> {
        try {
            const data = await axios.post(`${this.URL}/verify/is_admin`, { token });
            return data.data.isAdmin;
        } catch (e) {
            Log.e(e.message, this.TAG);
            return false;
        }
    }
}
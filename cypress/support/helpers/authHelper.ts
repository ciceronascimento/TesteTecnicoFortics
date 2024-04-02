import authentication from "../../support/PageObjects/authenticationPage";

import * as users from "../../fixtures/userCredentials.json";

class authHelper {
    authenticate() {
        authentication.username.type(users.standard_user.username);
        authentication.password.type(users.standard_user.password);
    }
}

export default new authHelper();
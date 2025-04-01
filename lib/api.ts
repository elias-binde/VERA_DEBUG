import {dev} from "@/environements/environment";
import {encryptString} from "@/lib/encryptString";

const GRAPHQL_AUTH_URL = dev.graphQLAPIServer
const API_KEY = dev.key
const VERSION = '2.1.0'


function buildLoginQuery(username: string, password: string): string {
    return `mutation {
    userLoginSend(username: "${username}", password: "${password}") {
      salesOrg
      salesmanNumber
      access_token
      refresh_token
      access_token_lifetime
    }
  }`
}

export async function login(username: string, password: string) {

    console.log("login")


    const API_SECRET = encryptString(dev.secret, dev.encryptionSalt)


    const query = buildLoginQuery(username, password)

    const headers = {
        'X-Api-Key': API_KEY,
        'X-Api-Secret': API_SECRET,
        'Content-Type': 'application/json',
        'URID': `${VERSION}:${new Date().getTime()}:${Math.floor(Math.random() * 1e18)}`,
        'deviceId': "",
    }


    try {

        const res = await fetch(GRAPHQL_AUTH_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({query}),
        })
        const json = await res.json()
        console.log("json", json)
        return json
    } catch (err) {
        console.log("huh wtf ???", err)
        return {err}
    }
}


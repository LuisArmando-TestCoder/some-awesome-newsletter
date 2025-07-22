import { get } from "svelte/store";
import store from "../../store.ts";

export default async function getLeadsForConfigurator() {
  const response = await fetch(
    `${get(store).apiURL()}/leads/${get(store).configuratorEmail}`,
    {
      headers: {
        "x-auth-email": get(store).configuratorEmail,
        "x-auth-code": get(store).authCode,
      },
    }
  );

  
  if (!response.ok) {
    console.log("response", response)

    return null;
  }
  
  const object =  await response.json();

  console.log(object, "object N")

  return object;
}

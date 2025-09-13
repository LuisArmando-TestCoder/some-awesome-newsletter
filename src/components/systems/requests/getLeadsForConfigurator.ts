import { get } from "svelte/store";
import store from "../../store";
import getAuthHeaders from "./getAuthHeaders";

export default async function getLeadsForConfigurator() {
  const response = await fetch(
    `${get(store).apiURL()}/leads/${get(store).configuratorEmail}`,
    {
      headers: getAuthHeaders(),
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

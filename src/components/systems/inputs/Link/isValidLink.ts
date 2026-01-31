export 
function isValidURL(str: string): boolean {
  try {
    const url = new URL(str);

    // Allow only HTTP and HTTPS protocols.
    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    // Ensure hostname is present.
    if (!url.hostname) {
      return false;
    }

    // Validate hostname structure with a regular expression.
    // This regex checks for valid domain characters and at least one dot,
    // ensuring the TLD is at least two letters.
    const hostnameRegex = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,}$/;
    // For IPv4 addresses, use a simple check.
    const ipv4Regex =
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    if (!hostnameRegex.test(url.hostname) && !ipv4Regex.test(url.hostname)) {
      return false;
    }

    // Validate port (if specified) is within the valid range.
    if (url.port) {
      const port = Number(url.port);
      if (isNaN(port) || port < 1 || port > 65535) {
        return false;
      }
    }

    // Optional: Further validation for the URL path.
    // This basic regex ensures that the pathname contains only allowed characters.
    if (
      url.pathname &&
      !/^\/[a-zA-Z0-9\-._~%!$&'()*+,;=:@\/]*$/.test(url.pathname)
    ) {
      return false;
    }

    // Optional: Validate search parameters.
    // Ensure that query keys and values only contain allowed characters.
    // Allowed characters: alphanumerics and -._~%!$&'()*+,;=:@/?
    if (url.search) {
      const queryParamRegex = /^[a-zA-Z0-9\-._~%!$&'()*+,;=:@\/?]*$/;
      for (const [key, value] of url.searchParams) {
        if (!queryParamRegex.test(key) || !queryParamRegex.test(value)) {
          return false;
        }
      }
    }

    return true;
  } catch {
    return false;
  }
}
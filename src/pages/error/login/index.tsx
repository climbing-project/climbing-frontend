import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      setLoginError(router.query.error as string); // Shown below the input field in my example
      setEmail(router.query.email as string); // To prefill the email after redirect
    }
  }, [router]);
}

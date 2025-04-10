import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e, type) => {
    if (type == "signup") {
      setSignupInput({ ...signupInput, [e.target.id]: e.target.value });
    } else {
      setLoginInput({ ...loginInput, [e.target.id]: e.target.value });
    }
  };

  return (
    <div className="flex items-center w-full justify-center m-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={signupInput.fullName}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Enter fullname"
                  required="true"
                />
              </div>
              <div className="spcace-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={signupInput.email}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Enter email"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={signupInput.password}
                  onChange={(e) => handleChange(e, "signup")}
                  placeholder="Enter password"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button></Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                    
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;

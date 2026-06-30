import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema/auth.schema";
import { RegisterDTO } from "@/@types/Auth";

export function RegisterForm() {
  const form = useForm({ resolver: zodResolver(RegisterSchema) });

  const handleRegister = (data: RegisterDTO): void => {
    console.log(data);
  };

  return (
    <div
      className="flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-popover border-popover w-[25vw] rounded-lg p-6">
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FieldSet className="gap-6">
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                <FieldLegend className="text-white-1">Register</FieldLegend>
                <FieldDescription>Create your account</FieldDescription>
              </div>
              <div>
                <Button className="bg-primary text- aspect-square w-8 scale-x-120 cursor-pointer">
                  X
                </Button>
              </div>
            </div>
            <FieldGroup className="gap-3">
              <Field>
                <FieldLabel htmlFor="name">Email</FieldLabel>
                <Input
                  {...form.register("email")}
                  id="name"
                  autoComplete="off"
                  type="name"
                  placeholder="email@example.com"
                />

                <FieldError errors={[form.formState.errors.email]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Password</FieldLabel>
                <Input
                  {...form.register("password")}
                  id="name"
                  autoComplete="off"
                  type="password"
                  placeholder="password"
                />
                <FieldError errors={[form.formState.errors.password]} />
                <Input
                  {...form.register("confirm")}
                  type="password"
                  id="name"
                  autoComplete="off"
                  placeholder="confirm password"
                />
                <FieldError errors={[form.formState.errors.confirm]} />
              </Field>
            </FieldGroup>
            <Button className="bg-primary cursor-pointer" type="submit">
              Sign Up
            </Button>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}

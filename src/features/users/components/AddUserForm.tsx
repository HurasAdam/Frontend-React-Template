import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import {
  createUserSchema,
  type CreateUserPayload,
} from "../validation/create-user.schema";

interface Props {
  roles: { _id: string; name: string }[];
  onSubmit: (data: CreateUserPayload) => void;
  isSubmitting: boolean;
}

export const AddUserForm = ({ roles, onSubmit, isSubmitting }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm<CreateUserPayload>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
    mode: "onChange",
  });

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    form.setValue("password", pass, { shouldValidate: true });
  };

  const copyPassword = async () => {
    const value = form.getValues("password");
    if (!value) return;

    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* BASIC INFO */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus className="bg-input/40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-input/40" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-input/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hasło</FormLabel>

                <div className="flex items-center gap-2">
                  <FormControl className="flex-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="bg-input/40"
                      placeholder="Kliknij generuj"
                    />
                  </FormControl>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={copyPassword}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={generatePassword}
                  >
                    Generuj
                  </Button>
                </div>

                {copied ? (
                  <p className="text-xs text-green-600">
                    Skopiowano do schowka
                  </p>
                ) : (
                  <p className="text-xs h-4 text-green-600"></p>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ROLE + PHONE */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rola</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-input/40">
                      <SelectValue placeholder="Wybierz rolę" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r._id} value={r._id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-input/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          className="w-full mt-6 h-10 font-medium"
          disabled={!form.formState.isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin mr-2" />
              Tworzenie...
            </>
          ) : (
            <>
              <Check className="mr-2" />
              Utwórz użytkownika
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

import { useAuth } from "../context/AuthContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormFields = z.infer<typeof loginSchema>;

export const Login = () => {
  const { login } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormFields) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: t("login.invalid"),
      });
      setError("password", {
        type: "manual",
        message: t("login.invalid"),
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {t("login.title")}
          </div>
          <LanguageSwitcher />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Email
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("login.emailTitle")}
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div> */}

          <Input
            label={t("login.emailTitle")}
            type="email"
            labelCustom="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Password */}
          <Input
            label={t("login.passTitle")}
            type="password"
            labelCustom="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            inputCustom="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Submit */}

          <Button
            title={t("login.loginBtn")}
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </form>
      </div>
    </div>
  );
};

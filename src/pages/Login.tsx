import React from "react";
import { useAuth } from "../context/AuthContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

export const Login = () => {
  const { login } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      // Nếu login fail, hiển thị lỗi lên cả hai field
      setError("email", {
        type: "manual",
        message: t("login.invalid") || "Invalid email or password",
      });
      setError("password", {
        type: "manual",
        message: t("login.invalid") || "Invalid email or password",
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
          {/* Email */}
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
              autoComplete="email"
              {...register("email", {
                required: t("login.emailRequired"),
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:
                    t("login.emailInvalid") || "Invalid email format",
                },
              })}
              className="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("login.passTitle")}
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required:
                  t("login.passRequired"),
                minLength: {
                  value: 6,
                  message:
                    t("login.passMin") ||
                    "Password must be at least 6 characters",
                },
              })}
              className="block w-full px-3 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {t("login.loginBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};

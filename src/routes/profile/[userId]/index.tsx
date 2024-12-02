import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  zod$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import type { ButtonVariant } from "flowbite-qwik";
import { Button, Input } from "flowbite-qwik";
import AuthController from "~/controllers/AuthController";

export const useGetUser = routeLoader$(async ({ params, status }) => {
  const userId = params.userId;
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    // Set the status to 404 if the user is not found
    status(404);
  }
  return user;
});

export const useEditUser = routeAction$(
  async (userData, { params }) => {
    const userId = params.userId;
    const prisma = new PrismaClient();
    const userUpdate = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: userData.username as string,
        email: userData.email as string,
        password: await AuthController.hashPassword(
          userData.password as string,
        ),
      },
    });

    return {
      success: true,
      userUpdate,
    };
  },
  zod$((z) => {
    return z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(8, "Password must be more than 8 characters"),
      username: z.string(),
    });
  }),
);

export default component$(() => {
  const user = useGetUser();
  const action = useEditUser();
  const isEditing = useSignal<boolean>(false);

  useTask$(({ track }) => {
    const success = track(() => action.value?.success);
    if (success) {
      isEditing.value = false;
    }
  });

  return (
    <>
      <div class="flex h-screen w-full flex-col items-center justify-center">
        <div class="max-h-4/5 w-4/5 rounded-md border border-[sage-green] p-4">
          <div class="flex items-center justify-between border-b-[1px] p-2">
            <h1 class=" text-3xl font-semibold">Profile</h1>
            {!isEditing.value ? (
              <Button
                style={{ transform: "none" }}
                size="md"
                class="primary-btn"
                color={"sage-green" as ButtonVariant}
                onClick$={() => {
                  isEditing.value = true;
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                style={{ transform: "none" }}
                size="md"
                class="primary-btn"
                color={"sage-green" as ButtonVariant}
                onClick$={() => {
                  isEditing.value = false;
                }}
              >
                Cancel
              </Button>
            )}
          </div>
          {!isEditing.value ? (
            <div class="mt-2 w-full p-2">
              <div class="grid w-full gap-4">
                <Input
                  label="Email"
                  type="email"
                  disabled
                  value={user.value?.email as string}
                />
                <Input
                  label="Username"
                  disabled
                  value={user.value?.username}
                  placeholder="Add your username now!"
                />
                <Input label="Password" disabled value={"*************"} />
                {action.value?.success && (
                  <small class="text-green-400">
                    Profile updated successfully!
                  </small>
                )}
              </div>
            </div>
          ) : (
            <div class="mt-2 w-full p-2">
              <Form class="grid w-full gap-4" action={action}>
                <Input
                  type="email"
                  label="Email"
                  value={user.value?.email}
                  name="email"
                />
                <Input
                  label="Username"
                  value={user.value?.username}
                  placeholder="Add your username now!"
                  name="username"
                />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  value={
                    user.value?.password
                      ? ""
                      : "Add a password now!"
                  }
                />
                <Button
                  class="primary-btn mt-2 rounded-md"
                  style={{ transform: "none" }}
                  color={"sage-green" as ButtonVariant}
                >
                  Save
                </Button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "About",
  meta: [
    {
      name: "description",
      content: "CookeryExplorer About Page",
    },
  ],
};

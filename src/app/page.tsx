import { auth, currentUser } from "@clerk/nextjs/server";

import NewsRedirectButton from "@/components/newsRedirectButton";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen p-8 pb-20">
        <h1 className="m-2">You need to sign in first!</h1>
      </div>
    );
  }

  const user = await currentUser();
  if (!user) {
    return (
      <div className="flex justify-center items-center flex-col min-h-screen p-8 pb-20">
        <h1 className="m-2">User data could not be retrieved</h1>
      </div>
    );
  }

  const email =
    user?.emailAddresses[0].emailAddress ?? "no email address availble";
  console.log(email);

  const fullName = user?.firstName + " " + user?.lastName;

  return (
    <div className="flex justify-center items-center justify-items-center flex-col min-h-screen p-8 pb-20 ">
      <h1 className="m-2">Hellow {fullName}</h1>
      <NewsRedirectButton />
    </div>
  );
}

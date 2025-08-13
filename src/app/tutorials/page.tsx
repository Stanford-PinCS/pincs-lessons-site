import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";
import LessonWrapper from "@/components/LessonWrapper";
import List from "@/components/List";
import Link from "next/link";

export default function () {
  return (
    <LessonWrapper>
      <Block color="green" title="Tutorials">
        <p>
          We're glad you want to make lessons with us. Here are a few resources
          to get started:
        </p>
        <p>
          <Emphasize>Starting Resources (25 minutes):</Emphasize>
        </p>
        <List
          items={[
            <Link
              className="text-blue-500"
              href={"./tutorials/pincs-overview/lesson"}
            >
              PinCS Resource Overview (5 minutes)
            </Link>,
            <Link
              className="text-blue-500"
              href={"./tutorials/lesson-maker-tutorial/lesson"}
            >
              Your first lesson (10 minutes)
            </Link>,
            <Link className="text-blue-500" href={"."}>
              Making the computer science portion (10 minutes)
            </Link>,
          ]}
        />
        <p>
          <Emphasize>Advanced Resources (2 hours):</Emphasize>
        </p>
        <List
          items={[
            <>Interactive diagrams (10 minutes)</>,
            <>Custom components (10 minutes)</>,
            <>Custom coding portion (50 minutes)</>,
            <>Making a Unity plugin (50 minutes)</>,
          ]}
        />
      </Block>
    </LessonWrapper>
  );
}

import { Form, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "./Button";

interface HeaderProps {
  title: string;
  description: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  onChangeHandler,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef: any = useRef();
  const navigation = useNavigation();

  const onClickHandler = () => setIsDisabled(false);

  useEffect(() => {
    if (!isDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  useEffect(() => {
    if (navigation.state === "submitting") setIsDisabled(true);
  }, [navigation.state]);
  return (
    <div className="flex items-start gap-4">
      <img src="assets/Logo.svg" alt="logo" />
      <Form method="put">
        <div className="flex gap-4">
          <input
            type="text"
            name="title"
            ref={inputRef}
            value={title}
            className="text-4xl w-64 bg-[transparent] outline-none border-b border-b-[transparent] focus:border-b-neutral-800 caret-primary-100 selection:bg-primary-100"
            disabled={isDisabled}
            onChange={onChangeHandler}
          />
          {isDisabled ? (
            <img
              src="assets/Edit_duotone.svg"
              alt="edit"
              className="cursor-pointer"
              onClick={onClickHandler}
            />
          ) : (
            <Button
              action="updateTaskBoard"
              content="Update"
              icon="Done_round.svg"
            />
          )}
        </div>
        <input
          type="text"
          name="description"
          value={description}
          className="mt-2 bg-[transparent] outline-none border-b border-b-[transparent] focus:border-b-neutral-800 caret-primary-100 selection:bg-primary-100"
          disabled={isDisabled}
          onChange={onChangeHandler}
        />
      </Form>
    </div>
  );
};

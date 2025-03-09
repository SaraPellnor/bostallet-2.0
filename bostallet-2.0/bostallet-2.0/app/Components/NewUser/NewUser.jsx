import { createUser } from "../../functions/functions";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";

const NewUser = ({ setIsAdmin, isAdmin }) => {
  return (
    <form
      action={createUser}
      className="flex flex-col bg-white p-4 rounded-md shadow-md"
    >
      <div className="font-bold flex justify-between bg-purple_1 text-white p-3 rounded-t-md">
        <input
          className="w-[49%] bg-purple_1 focus:bg-purple_2 text-white outline-none"
          placeholder="Namn"
          name="name"
          required
        />
        <input
          className="w-[49%] bg-purple_1 focus:bg-purple_2 text-white text-right outline-none"
          placeholder="Mobilnummer"
          name="mobile"
          required
        />
      </div>
      <div className="flex flex-col justify-between px-3 py-2">
        <p className="font-bold">E-post:</p>
        <input
          className="border rounded p-1"
          placeholder="exempel@mail.com"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="flex justify-between px-3 py-2">
        <p className="font-bold">Admin:</p>
        <p>
          {isAdmin ? (
            <MdOutlineCheckBox
              onClick={() => setIsAdmin(false)}
              className="text-2xl text-green-500"
            />
          ) : (
            <MdOutlineCheckBoxOutlineBlank
              onClick={() => setIsAdmin(true)}
              className="text-2xl"
            />
          )}
        </p>
      </div>
      {/* Hidden input för att skicka isAdmin till servern */}
      <input type="hidden" name="isAdmin" value={isAdmin} />
      <button
        type="submit"
        className="mt-3 px-3 py-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600"
      >
        Lägg till
      </button>
    </form>
  );
};

export default NewUser;

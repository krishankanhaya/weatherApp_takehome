import { FormEvent, useRef, useState } from "react";

const SearchComponent = ({setCity}: {setCity:(city: string) => void}) => {

  const cityInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const target = e.target as typeof e.target & {
          city: { value: string };
        };
        (target.city.value.length < 4)
          ? setError("City name should be at least 3 characters long.")
          : setCity(target.city.value);
        if (cityInputRef.current) {
          cityInputRef.current.value = "";
        }
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-control flex flex-col">
          <div className="flex flex-row justify-start items-center gap-2">
            <input
              type="city"
              id="city"
              placeholder="Search by City..."
              className=" bg-yellow-50 dark:bg-slate-900 border border-yellow-200 ml-1 p-1 rounded-sm placeholder:text-gray-400 placeholder:text-[.8rem] placeholder:px-2 focus:outline-none focus:border-yellow-400"
              ref={cityInputRef}
            />
            <button
              type="submit"
              className=" px-4 py-1 bg-blue-800 text-white font-semibold"
            >
              Search
            </button>
          </div>
          <div>
            <p className="text-[.85rem] text-red-400">{error}</p>
          </div>
        </div>
      </form>
    );
}

export default SearchComponent
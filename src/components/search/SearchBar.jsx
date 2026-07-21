import "./SearchBar.css";

function SearchBar({

    value,

    onChange,

    inputRef,

    onKeyDown,

    placeholder

}){

    return(

        <section className="qa-search">

            <div className="qa-search-box">

                <span className="qa-search-icon">

                    🧭

                </span>

                <input

                    ref={inputRef}

                    type="text"

                    value={value}

                    placeholder={placeholder}

                    onChange={(e)=>onChange(e.target.value)}

                    onKeyDown={onKeyDown}

                />

            </div>

        </section>

    );

}

export default SearchBar;
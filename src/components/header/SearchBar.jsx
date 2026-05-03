import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef();
  const searchRef = useRef();
  const lastKeyword = useRef("");

  // =====================
  // SEARCH
  // =====================
  const handleSearch = () => {
    const params = new URLSearchParams(location.search);

    if (keyword.trim()) {
      params.set("q", keyword);
    } else {
      params.delete("q");
    }

    params.set("page", 1);

    navigate(`${location.pathname}?${params.toString()}`);
  };

  // =====================
  // CLEAR
  // =====================
  const handleClear = () => {
    setKeyword("");

    const params = new URLSearchParams(location.search);
    params.delete("q");
    params.set("page", 1);

    navigate(`${location.pathname}?${params.toString()}`);

    inputRef.current?.focus();
  };

  // =====================
  // ENTER
  // =====================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // =====================
  // sync URL -> input
  // =====================
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setKeyword(params.get("q") || "");
  }, [location.search]);

  // =====================
  // click outside
  // =====================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        if (keyword !== lastKeyword.current) {
          lastKeyword.current = keyword;
          handleSearch();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [keyword]);

  return (
    <div className="header-search" ref={searchRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Tìm kiếm"
        className="search-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {keyword && (
        <button className="clear-btn" onClick={handleClear}>
          <XMarkIcon className="clear-icon" />
        </button>
      )}

      <button className="search-btn" onClick={handleSearch}>
        <MagnifyingGlassIcon className="search-icon" />
      </button>
    </div>
  );
}
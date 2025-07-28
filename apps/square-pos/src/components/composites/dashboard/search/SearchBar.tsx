"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import type { paramsType } from "@/shared/types/catalog";
import { css } from "~/styled-system/css";
import Form from "@/components/primitives/ui/form";
import { Input } from "@/components/primitives/ui/input";
import { useForm } from "react-hook-form";

/**
 * Props for the SearchBar component.
 */
interface SearchBarProps {
  setParams: (params: paramsType) => void;
  prevParams: paramsType;
}

/**
 * Search bar component for filtering products by keyword with debounce.
 * Updates params when the user types at least 3 characters.
 */
export default function SearchBar({ setParams, prevParams }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("");
  // Debounced search input value
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      setParams({
        ...prevParams,
        query: {
          ...(typeof prevParams.query === "object" && prevParams.query
            ? prevParams.query
            : {}),
          text_query: {
            keywords: [debouncedSearch],
          },
        },
      });
    } else {
      // If less than 3 chars, show initial product listing, remove search query
      setParams({
        types:
          "item, image, category, tax, discount, pricing_rule, product_set",
        query: {
          ...(typeof prevParams.query === "object" && prevParams.query
            ? prevParams.query
            : {}),
          text_query: undefined,
        },
      });
      setSearchInput("");
    }
  }, [debouncedSearch]);

  const form = useForm();

  return (
    // * pallas ui form and input components
    <Form.Provider form={form} onSubmit={(e) => e.preventDefault()}>
      <Form.Item>
        <Form.Control>
          <Input>
            <Input.Text
              className={css({
                px: "4",
                py: "2",
                border: "1px solid",
                borderColor: "gray.300",
                borderRadius: "md",
                fontSize: "md",
              })}
              placeholder="Search products..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </Input>
        </Form.Control>
      </Form.Item>
    </Form.Provider>

    // <form
    //   onSubmit={(e) => e.preventDefault()}
    //   className={css({
    //     display: "flex",
    //     alignItems: "center",
    //     gap: "2",
    //     w: "full",
    //     maxW: "md",
    //     mx: "auto",
    //     mb: "6",
    //   })}
    // >
    //   <input
    //     id="search-bar"
    //     type="text"
    //     value={searchInput}
    //     onChange={(event) => setSearchInput(event.target.value)}
    //     placeholder="Search products..."
    //     className={css({
    //       flex: 1,
    //       px: "4",
    //       py: "2",
    //       border: "1px solid",
    //       borderColor: "gray.300",
    //       borderRadius: "md",
    //       fontSize: "md",
    //       outline: "none",
    //       _focus: {
    //         borderColor: "gray.800",
    //         boxShadow: "0 0 0 1px rgb(61, 62, 62)",
    //       },
    //       transition: "border-color 0.2s, box-shadow 0.2s",
    //     })}
    //   />
    // </form>
  );
}

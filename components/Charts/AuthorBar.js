import React, { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Tab, Tablist, Pane, Heading, Paragraph } from "evergreen-ui";

const AuthorBar = (props) => {
  const [sortBy, setSortBy] = useState("Unique books");

  const sort = sortBy === "Total reads" ? "totalBooks" : "uniqueBooks";

  console.log(sortBy);

  const data = [...props.data];
  const sortData = (data, sortKey) => {
    switch (sortKey) {
      case "Total reads":
        data.sort((a, b) => (a.totalBooks < b.totalBooks ? 1 : -1));
        break;
      case "Unique books":
        data.sort((a, b) => (a.uniqueBooks < b.uniqueBooks ? 1 : -1));
        break;
    }
  };

  sortData(data, sortBy);

  return (
    <Pane
      marginTop={30}
      width="60%"
      background="white"
      elevation={2}
      padding={10}
    >
      <Heading size={700}>Top Authors By...</Heading>
      <Tablist paddingTop={20}>
        {["Unique books", "Total reads"].map((val, index) => (
          <Tab
            key={val}
            id={val}
            size={300}
            padding={10}
            isSelected={val === sortBy}
            onSelect={() => setSortBy(val)}
          >
            {val}
          </Tab>
        ))}
      </Tablist>

      <ResponsiveBar
        data={data.slice(0, 10).reverse()}
        indexBy="author"
        keys={[sort]}
        margin={{ left: 110 }}
        height={300}
        layout="horizontal"
        padding={0.3}
        borderRadius={5}
        enableGridX={false}
        enableGridY={false}
        axisLeft={{
          legendOffset: -100,
          tickSize: 0,
        }}
        tooltip={({ data }) => {
          return (
            <Paragraph padding={15}>
              You've read {data.uniqueBooks} books by {data.author}, a total of{" "}
              {data.totalBooks} times.
            </Paragraph>
          );
        }}
      />
    </Pane>
  );
};

export default AuthorBar;

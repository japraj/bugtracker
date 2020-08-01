import React from "react";
import {
  WidgetWrapper,
  WidgetHeader,
  WidgetSection,
} from "../../container/widget";
import { theme } from "../../../app/constants";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Icon from "@material-ui/core/Icon";
import TablePagination from "@material-ui/core/TablePagination";
import styled from "styled-components";
import { Fab } from "@material-ui/core";

// This is a super generic container component!

// the wrapperElement must take an element of the set array as a prop on the key
// elementPropName. Example: if a Dog component takes a Home object of the form
// {
//    street: string;
//    address: number;
// }
// as a prop on the key 'home' then the iterable widget for a set of Dogs would be
// called like so: <IterableWidget ... elementPropName="home"/>

// If any value is given to "wrap in section," then each node which corresponds to an object
// of the set array will be wrapped in a WidgetSection; otherwise, each node will just be
// a wrapperElement.

// Node classname can only be applied if wrapInSection is not undefined. If nodeClassNames are
// needed but wrapInSection is not, then passing default props would be a better way of handling
// it.
export default (props: {
  className: string;
  iconName: string;
  title: string;
  elementsPerPage: number;
  set: object[];
  wrapperElement: (args: any) => React.ReactNode;
  defaultProps: object;
  elementPropName: string;
  wrapInSection?: any;
  nodeClassName?: string;
  emptySetFallback: React.ReactNode | string;
}) => {
  const [page, setPage] = React.useState(0);
  const className =
    props.nodeClassName === undefined ? "" : props.nodeClassName;

  const nodes =
    props.set.length > 0 ? (
      props.set
        .filter(
          (element, index) =>
            index >= page * props.elementsPerPage &&
            index <= (page + 1) * props.elementsPerPage - 1
        )
        .map((element, index) => {
          // if a value is passed for 'wrapInSection,' then the
          // wrapperElement will be wrapped with a WidgetSection.
          const wrap: boolean = props.wrapInSection !== undefined;
          let elementProp: any = {};
          elementProp[props.elementPropName] = element;
          const node: React.ReactNode = props.wrapperElement(
            Object.assign(
              wrap ? {} : { key: index },
              props.defaultProps,
              elementProp
            )
          );
          return wrap ? (
            <WidgetSection className={className} key={index} children={node} />
          ) : (
            node
          );
        })
    ) : typeof props.emptySetFallback === "string" ? (
      <Fallback children={<h1 children={props.emptySetFallback} />} />
    ) : (
      props.emptySetFallback
    );

  return (
    <WidgetWrapper className={props.className}>
      <Header addmediaquery={props.set.length > props.elementsPerPage}>
        <Title>
          <Icon className="inline-icon" children={props.iconName} />
          <h1 children={props.title} />
        </Title>
        {props.set.length > props.elementsPerPage ? (
          <ThemeProvider
            theme={theme}
            children={
              <TablePagination
                component={PaginationContainer}
                count={props.set.length}
                page={page}
                onChangePage={(
                  event: React.MouseEvent<HTMLButtonElement> | null,
                  newPage: number
                ) => setPage(newPage)}
                rowsPerPage={props.elementsPerPage}
              />
            }
          />
        ) : (
          <React.Fragment />
        )}
      </Header>
      {nodes}
    </WidgetWrapper>
  );
};

const Header = styled(WidgetHeader)`
  ${(props: { addmediaquery: boolean }) =>
    props.addmediaquery
      ? `
        @media (max-width: 350px) {
          padding: 1.2rem 0 0;
          flex-direction: column;

         .MuiTablePagination-root {
            margin-left: 0;
         }
        }
      `
      : ``}
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  margin-left: auto;
  width: auto;
  height: auto;
  border: none !important;

  .MuiTablePagination-spacer + p,
  .MuiTablePagination-selectRoot {
    display: none;
  }

  .MuiTablePagination-actions {
    margin-left: 5px;
  }

  button {
    width: 35px;
    height: 35px;
    padding: 0;
  }
`;

const Fallback = styled(WidgetSection)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    line-height: 1.3;
    margin-left: 0 !important;
    padding: 10% 1rem 15%;
    font-style: italic;

    @media (min-width: 800px) {
      padding-top: 0;
    }
  }
`;
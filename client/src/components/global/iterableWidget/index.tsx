import React from "react";
import { WidgetWrapper, WidgetSection, Fallback } from "../../container/widget";
import { theme } from "../../../constants/materialui";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Icon from "@material-ui/core/Icon";
import TablePagination from "@material-ui/core/TablePagination";
import { Header, Title, PaginationContainer } from "./styles";

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

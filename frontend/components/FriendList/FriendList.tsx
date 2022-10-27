import React from "react";
import { FixedSizeList } from "react-window";
import { Scrollbars } from "react-custom-scrollbars";

class CustomList extends React.Component {
  listRef = React.createRef();

  handleScroll = ({ target }) => {
    const { scrollTop } = target;

    this.listRef.current.scrollTo(scrollTop);
  };

  render() {
    return (
      <Scrollbars
        autoHeight={true}
        autoHeightMax={300}
        onScroll={this.handleScroll}
      >
        <ListWrapper refList={this.listRef} />
      </Scrollbars>
    );
  }
}

const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

const FriendList = props => {
  return (
    <FixedSizeList
      height={300}
      itemCount={50000}
      itemSize={55}
      ref={props.refList}
      style={{ overflow: false }}
    >
      {Row}
    </FixedSizeList>
  );
};

export default FriendList;

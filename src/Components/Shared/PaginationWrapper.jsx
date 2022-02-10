import React from "react";
import Pagination from 'react-bootstrap/Pagination';
import TodoList from "./TodoList";

export default function withPagination(ListGroup, sourceData) {
    return class extends React.Component {
        pageItems = [];
        pageMap = new Map();
        active = 1;
        pageSize = 4;
        maxPage = null;
        minPage = 1;
        constructor(props) {
            super(props);
            this.pageSize = this.props.size;
            this.handlePageChange = this.handlePageChange.bind(this);
            this.convertToChunks([...sourceData]);
            this.currentActivePageFromStorage();
            this.state = {
                currentPage: this.pageMap.get(this.active)
            };

        }

        componentWillUpdate() {
            console.log("Component will update");
            this.currentActivePageFromStorage();
        }

        currentActivePageFromStorage() {
            let lastActive = parseInt(localStorage.getItem("active"));
            console.log(`Last active page: ${lastActive}`);
            if (lastActive) {
                if (lastActive <= this.maxPage) {
                    this.active = lastActive;
                    this.reRenderPageItem();
                }
                else
                    localStorage.setItem('active', this.active);
            }

        }

        convertToChunks(dataArr) {
            let size = 1;
            while (dataArr.length > 0) {
                this.pageMap.set(size, dataArr.splice(0, this.pageSize));
                const tempSize = size;
                this.pageItems.push(<Pagination.Item key={size} active={tempSize === this.active} onClick={() => this.handlePageChange("Page", tempSize)}>{size}</Pagination.Item>);
                size++;
            }
            this.maxPage = size - 1;
        }

        reRenderPageItem() {
            this.pageItems = [];
            for (let i = this.minPage; i <= this.maxPage; i++) {
                this.pageItems.push(<Pagination.Item key={i} active={i === this.active} onClick={() => this.handlePageChange("Page", i)}>{i}</Pagination.Item>);
            }
            localStorage.setItem("active", this.active);
        }

        handlePageChange(action, pageNumber = 1) {
            if (this.pageMap.size <= 0)
                return;

            switch (action) {
                case "First":
                    this.active = this.minPage
                    this.setState({
                        currentPage: this.pageMap.get(this.active)
                    });
                    break;
                case "Next":
                    if (this.maxPage == this.active)
                        return;

                    this.active = this.active + 1;
                    this.setState({
                        currentPage: this.pageMap.get(this.active)
                    });
                    break;
                case "Prev":
                    if (this.active == this.minPage)
                        return;

                    this.active = this.active - 1;
                    this.setState({
                        currentPage: this.pageMap.get(this.active)
                    });
                    break;
                case "Last":
                    if (this.active == this.maxPage)
                        return;

                    this.active = this.maxPage;
                    this.setState({
                        currentPage: this.pageMap.get(this.active)
                    });
                    break;
                case "Page":
                    this.active = pageNumber;
                    this.setState({
                        currentPage: this.pageMap.get(this.active)
                    });
                    break;
            }
            this.reRenderPageItem();
        }


        render() {
            const listItems = this.state.currentPage && this.state.currentPage.map((todo) => {
                return (
                    <ListGroup.Item key={todo.id}>
                        <TodoList handleDelete={() => this.props.deleteTodo(todo.id)} todo={todo} handleFormSubmit={(id, data, actions) => this.props.updateTodoForm(id, data, actions)}
                            handleFavUpdate={(id) => this.props.updateFav(sourceData.find(t => t.id == id))}
                        >
                        </TodoList>
                    </ListGroup.Item>
                );
            });

            return (
                <>
                    <ListGroup>{listItems}</ListGroup>
                    <Pagination>
                        <Pagination.First onClick={() => this.handlePageChange("First")} />
                        <Pagination.Prev onClick={() => this.handlePageChange("Prev")} />
                        {this.pageItems}
                        <Pagination.Next onClick={() => this.handlePageChange("Next")} />
                        <Pagination.Last onClick={() => this.handlePageChange("Last")} />
                    </Pagination>
                </>
            );
        }
    }

}
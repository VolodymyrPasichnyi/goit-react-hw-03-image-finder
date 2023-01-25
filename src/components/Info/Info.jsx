import { Component } from "react";
import { pixabayApi } from "components/services/pixabayApi";

export class Info extends Component {
    state = {
        img: null,
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.value !== this.props.value) {
            pixabayApi(this.props.value)
                .then((response) => response.json()
                .then((img) => {
                    this.setState({ img })
                })
                )
        }
    }

    render () {
        return (
            <>
            {this.state.img 
                && this.state.img.hits.map(el => 
                <p key={el.id}>{el.largeImageURL}</p>
            )}
            </>
        )
    }
}
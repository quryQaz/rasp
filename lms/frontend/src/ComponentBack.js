import React, { PureComponent, Suspense } from "react";

class ComponentBack extends PureComponent {
    static defaultProps = {
        data: {},
    };

    render = () => {
        const { component } = this.props;
        if (!component) {
            return <div/>;
        }

        const Component = component;
        return (
            // <Suspense fallback={<Preloader />}> TODO добавить прелоадер.
                <Component/>
            // </Suspense>
        );
    };
}

export { ComponentBack };

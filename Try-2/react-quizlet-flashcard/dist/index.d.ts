/// <reference types="react" />
import PropTypes from 'prop-types';

interface ButtonProps {
    label: string;
}
declare const Button: (props: ButtonProps) => JSX.Element;

interface FlashcardProps {
    front: string;
    back: string;
    className?: string;
    reset?: boolean;
}
declare function Flashcard({ front, back, className, reset }: FlashcardProps): JSX.Element;
declare namespace Flashcard {
    var propTypes: {
        front: PropTypes.Requireable<string>;
        back: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        front: string;
        back: string;
        className: string;
    };
}

export { Button, Flashcard };

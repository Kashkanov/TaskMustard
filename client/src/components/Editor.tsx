import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type {FC} from "react";

type EditorPropsType = {
    content: string,
    handleContentChange?: (value: string) => void,
}

const Editor: FC<EditorPropsType> = ({content, handleContentChange}) => {

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }, {list: 'check'}],
            ['link', 'image'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'list',
        'bullet',
        'link',
        'image',
    ];

    return (
        <div>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default Editor;

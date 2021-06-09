import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function NewStoryPage() {
    const [title, setTitle] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [content, setContent] = useState('');
    const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
    const history = useHistory();

    const body = {
        title,
        coverUrl,
        contentPreview: 'Esta é a estrutura de um post esperado pelo front-end',
        content,
        commentCount: 0,
    };

    function onPostSaveButtonClick() {
        setSaveButtonDisable(true);
        const promise = axios.post('http://localhost:4000/posts', body);
        promise.then(() => {
            setSaveButtonDisable(false);
            setTitle('');
            setCoverUrl('');
            setContent('');
            history.push('/');
        });
    }

    return (
        <PostManipulation
            title={title}
            onTitleChange={(newTitle) => setTitle(newTitle)}
            coverUrl={coverUrl}
            onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
            content={content}
            onContentChange={(newContent) => setContent(newContent)}
            onPostSaveButtonClick={onPostSaveButtonClick}
            isSaveButtonDisabled={isSaveButtonDisabled}
        />
    );
}

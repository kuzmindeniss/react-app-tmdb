import FilmsSearch from 'components/FilmsSearch/FilmsSearch';
import { LayoutContent } from 'components/Layout/Layout';
import React from 'react';

const SearchPage: React.FC = () => {
	return <LayoutContent>
		<FilmsSearch/>
	</LayoutContent>
}

export default SearchPage;
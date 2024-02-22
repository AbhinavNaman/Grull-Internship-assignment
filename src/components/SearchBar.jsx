// import { TextInput, ActionIcon, useMantineTheme, rem } from '@mantine/core';
// import { IconSearch, IconArrowRight } from '@tabler/icons-react';

// export default function SerachBar(props) {
//   const theme = useMantineTheme();

//   return (
//     <TextInput
//       radius="xl"
//       size="md"
//       placeholder="Search questions"
//       rightSectionWidth={42}
//       leftSection={<IconSearch style={{ width: rem(18), height: rem(18), }} stroke={1.5} />}
//       rightSection={
//         <ActionIcon size={32} radius="xl" color={theme.colors.blue[3]} variant="filled">
//           <IconArrowRight style={{ width: rem(18), height: rem(18) }} color={theme.colors.blue[6]} stroke={1.5} />
//         </ActionIcon>
//       }
//       {...props}
//     />
//   );
// }

import React, { useState } from 'react';
import { TextInput, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

export default function SearchBar({ setSearchQuery }) { // Receive setSearchQuery as prop
  const [query, setQuery] = useState(''); // Local state to store the search query entered by the user
  const theme = useMantineTheme();

  // Event handler to update the local state and trigger the filtering process in the parent component
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value); // Update local state
    setSearchQuery(value); // Trigger filtering process in parent component by calling setSearchQuery
  };

  return (
    <TextInput
      value={query} // Bind input value to local state
      onChange={handleInputChange} // Call handleInputChange on input change
      radius="xl"
      size="md"
      placeholder="Search questions"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.colors.blue[3]} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} color={theme.colors.blue[6]} stroke={1.5} />
        </ActionIcon>
      }
    />
  );
}

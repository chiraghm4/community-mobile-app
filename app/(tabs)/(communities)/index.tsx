import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import CommunitiesData from '@/assets/Data/fakeCommunitiesData.json'
import CommunitiesComp from '@/Components/Communities';

const CommunitiesPage = () => {
  const getComunities = useMemo(() => CommunitiesData.dataMedium, []);
  return (
    <View>
      <CommunitiesComp CommunitiesInfo = {getComunities} />
    </View>
  )
}

export default CommunitiesPage
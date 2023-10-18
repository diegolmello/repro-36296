import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const Element = ({count, color}) => (
  <View
    style={[
      styles.elementContainer,
      {
        backgroundColor: color,
      },
    ]}>
    <Text style={styles.elementText}>{count}</Text>
  </View>
);

function Elements() {
  const [yellowCount, setYellowCount] = useState(800);
  const [redCount, setRedCount] = useState(800);

  // I tried this first, but results were the same for all RN versions
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setYellowCount(count => count + 1);
  //     setRedCount(count => count + 1);
  //   }, 10);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.reverse]}>
        {new Array(yellowCount).fill('').map((_, index) => (
          <Element key={index} count={index} color="yellow" />
        ))}
      </View>
      {new Array(redCount).fill('').map((_, index) => (
        <Element key={index} count={index} color="red" />
      ))}
    </View>
  );
}

const maxCount = 10;

const App = () => {
  const [isElementsVisible, setIsElementsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (count >= maxCount) {
        return;
      }
      setIsElementsVisible(!isElementsVisible);
      setCount(count + 1);
    }, 1000);
  }, [isElementsVisible, setIsElementsVisible, count, setCount]);

  if (count >= maxCount) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Done!</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={{margin: 10}}>
        <Button
          title={isElementsVisible ? 'Hide' : 'Show'}
          onPress={() => setIsElementsVisible(!isElementsVisible)}
        />
      </View>
      {isElementsVisible ? <Elements /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reverse: {
    backgroundColor: 'blue',
    ...StyleSheet.absoluteFill,
    flexWrap: 'wrap-reverse',
    flexDirection: 'row-reverse',
  },
  elementContainer: {
    width: 10,
    height: 10,

    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementText: {
    fontSize: 5,
  },
});

export default App;

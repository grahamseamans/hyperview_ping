// import Hyperview from 'hyperview';
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

// // const ChatComponent = ({ wsURL }) => {
// export default class HyperviewChat extends PureComponent<Props> {
//     static namespaceURI = 'https://instawork.com/hyperview-map';

//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [allMessagesLoaded, setAllMessagesLoaded] = useState(false);
//     const ws = useRef(null);

//     useEffect(() => {
//         ws.current = new WebSocket(wsURL);
//         ws.current.onopen = () => console.log("WebSocket Connected");
//         ws.current.onmessage = (e) => {
//             const message = JSON.parse(e.data);
//             if (message.type === 'oldMessages') {
//                 if (message.data.length === 0) {
//                     setAllMessagesLoaded(true); // No more messages to load
//                 } else {
//                     setMessages(prevMessages => [...prevMessages, ...message.data]);
//                 }
//                 setLoading(false);
//             } else {
//                 setMessages(prevMessages => [message, ...prevMessages]);
//             }
//         };
//         ws.current.onerror = (e) => {
//             console.log('WebSocket Error: ', e.message);
//             setLoading(false);
//         };
//         ws.current.onclose = () => console.log("WebSocket Disconnected");

//         return () => {
//             ws.current.close();
//         };
//     }, [wsURL]);

//     const requestOldMessages = () => {
//         if (!loading && !allMessagesLoaded) {
//             setLoading(true);
//             const oldestMessageId = messages[messages.length - 1]?.id;
//             ws.current.send(JSON.stringify({ type: 'requestOldMessages', messageId: oldestMessageId }));
//         }
//     };

//     const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
//         return contentOffset.y === 0;
//     };

//     return (
//         <View style={{ flex: 1, paddingTop: 50 }}>
//             <FlatList
//                 data={messages}
//                 keyExtractor={item => item.id.toString()}
//                 renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
//                 onScroll={({ nativeEvent }) => {
//                     if (isCloseToTop(nativeEvent)) {
//                         requestOldMessages();
//                     }
//                 }}
//                 inverted
//                 ListHeaderComponent={
//                     loading ? (
//                         <ActivityIndicator size="small" color="#0000ff" />
//                     ) : allMessagesLoaded ? (
//                         <Text style={styles.endOfMessages}>End of Messages</Text>
//                     ) : null
//                 }
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     message: {
//         fontSize: 16,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#e0e0e0',
//         borderRadius: 5,
//         margin: 5,
//     },
//     endOfMessages: {
//         textAlign: 'center',
//         color: '#888',
//         padding: 10,
//     }
// });

// export default ChatComponent;
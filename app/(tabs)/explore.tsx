import { Clock, Coffee, Heart, Layers, MapPin, Star, Utensils, X } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import { Alert, Clipboard, Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

// 모든 데이터에 필수 필드 기본값 보장
const MOCK_DATA = [
    {
        id: 1,
        type: "CAFE",
        lat: 37.567,
        lng: 126.9795,
        icon: "☕",
        name: "스타벅스 무교점",
        score: 4.5,
        review: 128,
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
        desc: "도심 속에서 즐기는 익숙한 커피의 여유",
        address: "서울 중구 무교로 21",
        time: "07:00 - 22:00",
        tags: ["역세권", "와이파이"],
    },
    {
        id: 2,
        type: "CAFE",
        lat: 37.566,
        lng: 126.977,
        icon: "☕",
        name: "커피빈 시청점",
        score: 4.3,
        review: 85,
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
        desc: "헤이즐넛 아메리카노가 맛있는 아늑한 공간",
        address: "서울 중구 세종대로 110",
        time: "08:00 - 21:00",
        tags: ["친절함"],
    },
    {
        id: 3,
        type: "CAFE",
        lat: 37.5655,
        lng: 126.9805,
        icon: "☕",
        name: "폴바셋 외환은행본점",
        score: 4.7,
        review: 210,
        img: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=500",
        desc: "상하목장 아이스크림과 진한 라떼의 조화",
        address: "서울 중구 을지로 2길",
        time: "07:30 - 22:00",
        tags: ["라떼맛집"],
    },
    {
        id: 4,
        type: "CAFE",
        lat: 37.5685,
        lng: 126.9775,
        icon: "☕",
        name: "블루보틀 시청",
        score: 4.6,
        review: 312,
        img: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=500",
        desc: "정성스럽게 내린 핸드드립 커피 전문점",
        address: "서울 중구 을지로 1길",
        time: "08:00 - 20:00",
        tags: ["스페셜티"],
    },
    {
        id: 5,
        type: "CAFE",
        lat: 37.564,
        lng: 126.978,
        icon: "☕",
        name: "할리스 시청역점",
        score: 4.1,
        review: 56,
        img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500",
        desc: "공부하거나 작업하기 좋은 넓은 매장",
        address: "서울 중구 세종대로 93",
        time: "00:00 - 24:00",
        tags: ["24시"],
    },
    {
        id: 11,
        type: "CAFE",
        lat: 37.563,
        lng: 126.976,
        icon: "☕",
        name: "아티제 정동점",
        score: 4.4,
        review: 92,
        img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500",
        desc: "수제 케이크와 베이커리가 일품인 카페",
        address: "서울 중구 정동길 3",
        time: "08:00 - 21:30",
        tags: ["디저트"],
    },
    {
        id: 12,
        type: "CAFE",
        lat: 37.569,
        lng: 126.981,
        icon: "☕",
        name: "루소랩 정동",
        score: 4.8,
        review: 145,
        img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500",
        desc: "스페셜티 커피의 진수를 맛볼 수 있는 곳",
        address: "서울 중구 정동길 17",
        time: "09:00 - 20:00",
        tags: ["브런치"],
    },
    {
        id: 13,
        type: "CAFE",
        lat: 37.57,
        lng: 126.978,
        icon: "☕",
        name: "테라로사 광화문",
        score: 4.6,
        review: 520,
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500",
        desc: "강릉의 명성을 그대로 담은 대형 로스터리 카페",
        address: "서울 종로구 종로 1길 50",
        time: "07:30 - 22:00",
        tags: ["핸드드립"],
    },
    {
        id: 14,
        type: "CAFE",
        lat: 37.565,
        lng: 126.982,
        icon: "☕",
        name: "투썸플레이스 을지로",
        score: 4.0,
        review: 67,
        img: "", // 이미지 부재 예외 처리 테스트
        isOpen: false, // 영업 준비 중 예외 처리 테스트
        desc: "디저트와 함께 즐기는 도심 속 휴식 공간",
        address: "서울 중구 을지로 100",
        time: "07:00 - 23:00",
        tags: ["케이크"],
    },
    {
        id: 15,
        type: "CAFE",
        lat: 37.5675,
        lng: 126.975,
        icon: "☕",
        name: "커피스니퍼",
        score: 4.9,
        review: 188,
        img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500",
        desc: "힙한 분위기의 감각적인 시그니처 커피 맛집",
        address: "서울 중구 세종대로 16길 27",
        time: "08:00 - 20:00",
        tags: ["분위기맛집"],
    },

    {
        id: 6,
        type: "FOOD",
        lat: 37.568,
        lng: 126.9785,
        icon: "🍴",
        name: "우래옥",
        score: 4.9,
        review: 342,
        img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500",
        desc: "평양냉면의 명가, 깊은 육수의 풍미",
        address: "서울 중구 창경궁로 62-29",
        time: "11:20 - 21:00",
        tags: ["미쉐린", "평양냉면"],
    },
    {
        id: 7,
        type: "FOOD",
        lat: 37.5645,
        lng: 126.976,
        icon: "🍴",
        name: "만족오향족발",
        score: 4.7,
        review: 856,
        img: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=500",
        desc: "서울 3대 족발, 쫄깃하고 달큰한 맛",
        address: "서울 중구 서소문로 134-7",
        time: "11:30 - 22:00",
        tags: ["3대족발"],
    },
    {
        id: 8,
        type: "FOOD",
        lat: 37.5695,
        lng: 126.979,
        icon: "🍴",
        name: "진주회관",
        score: 4.8,
        review: 423,
        img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
        desc: "여름엔 역시 걸쭉한 콩국수의 끝판왕",
        address: "서울 중구 세종대로 11길 26",
        time: "11:00 - 21:00",
        tags: ["콩국수맛집"],
    },
    {
        id: 9,
        type: "FOOD",
        lat: 37.5635,
        lng: 126.9755,
        icon: "🍴",
        name: "조선옥",
        score: 4.5,
        review: 112,
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
        desc: "60년 전통의 소갈비 양념구이 전문점",
        address: "서울 중구 을지로 15길 6-5",
        time: "11:30 - 21:30",
        tags: ["노포"],
    },
    {
        id: 10,
        type: "FOOD",
        lat: 37.5675,
        lng: 126.9815,
        icon: "🍴",
        name: "청진옥",
        score: 4.6,
        review: 278,
        img: "https://images.unsplash.com/photo-1547523106-256ef70d591f?w=500",
        desc: "해장국의 역사, 깔끔한 선지 해장국",
        address: "서울 종로구 종로 3길 32",
        time: "00:00 - 24:00",
        tags: ["해장국"],
    },
    {
        id: 16,
        type: "FOOD",
        lat: 37.566,
        lng: 126.983,
        icon: "🍴",
        name: "명동교자 본점",
        score: 4.8,
        review: 1250,
        img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500",
        desc: "칼국수와 마늘 김치의 환상적인 궁합",
        address: "서울 중구 명동 10길 25-2",
        time: "10:30 - 21:00",
        tags: ["칼국수"],
    },
    {
        id: 17,
        type: "FOOD",
        lat: 37.564,
        lng: 126.974,
        icon: "🍴",
        name: "정동국시",
        score: 4.3,
        review: 45,
        img: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=500",
        desc: "정갈한 사골 육수의 안동국시 전문점",
        address: "서울 중구 정동길 12-11",
        time: "11:00 - 21:00",
        tags: ["정갈함"],
    },
    {
        id: 18,
        type: "FOOD",
        lat: 37.571,
        lng: 126.9765,
        icon: "🍴",
        name: "광화문 미진",
        score: 4.7,
        review: 678,
        img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
        desc: "시원한 판모밀과 바삭한 돈까스 맛집",
        address: "서울 종로구 종로 19",
        time: "10:30 - 21:00",
        tags: ["판모밀"],
    },
    {
        id: 19,
        type: "FOOD",
        lat: 37.569,
        lng: 126.9825,
        icon: "🍴",
        name: "이문설농탕",
        score: 4.5,
        review: 310,
        img: "https://images.unsplash.com/photo-1547928576-a4a33237ce35?w=500",
        desc: "대한민국 공식 1호 음식점, 맑은 설렁탕",
        address: "서울 종로구 우정국로 38-13",
        time: "08:00 - 21:00",
        tags: ["100년전통"],
    },
    {
        id: 20,
        type: "FOOD",
        lat: 37.565,
        lng: 126.979,
        icon: "🍴",
        name: "무교동 유정낙지",
        score: 4.4,
        review: 156,
        img: "https://images.unsplash.com/photo-1534422298391-e4f8c170db06?w=500",
        desc: "매콤한 양념과 쫄깃한 낙지의 중독적인 맛",
        address: "서울 중구 세종대로 21길 22",
        time: "11:00 - 22:00",
        tags: ["매운맛"],
    },
];

export default function ExploreScreen() {
    const webViewRef = useRef<WebView>(null);
    const [category, setCategory] = useState("ALL");
    const [selectedPlace, setSelectedPlace] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const ncpKeyId = process.env.EXPO_PUBLIC_NCP_KEY_ID || "hraspfiyi8";
    const center = { lat: 37.5665, lng: 126.978 };

    const onMessage = (event: any) => {
        const placeId = Number(event.nativeEvent.data);
        const place = MOCK_DATA.find((p) => p.id === placeId);
        if (place) {
            setSelectedPlace(place);
            setIsModalVisible(true);
        }
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text || "주소 정보 없음");
        Alert.alert("알림", "주소가 복사되었습니다.");
    };

    const mapHtml = useMemo(
        () => `
            <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                        <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ncpKeyId}"></script>
                        <style>
                            body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
                            #map { width: 100%; height: 100vh; }
                            .marker-pin {
                                width: 38px; height: 38px;
                                background: white;
                                border: 0.5px solid #f4f4f5;
                                border-radius: 50% 50% 50% 0;
                                transform: rotate(-45deg);
                                display: flex; justify-content: center; align-items: center;
                                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                            }
                            .marker-icon { transform: rotate(45deg); font-size: 16px; }
                        </style>
                    </head>
                    <body>
                        <div id="map"></div>
                        <script>
                            var map;
                            var markerObjects = [];
                            window.onload = function() {
                                map = new naver.maps.Map('map', {
                                    center: new naver.maps.LatLng(${center.lat}, ${center.lng}),
                                    zoom: 16, logoControl: false, zoomControl: false, mapDataControl: false
                                });
                                var data = ${JSON.stringify(MOCK_DATA)};
                                data.forEach(function(item) {
                                    var content = '<div class="marker-pin"><div class="marker-icon">' + item.icon + '</div></div>';
                                    var marker = new naver.maps.Marker({
                                        position: new naver.maps.LatLng(item.lat, item.lng),
                                        map: map,
                                        icon: { content: content, anchor: new naver.maps.Point(19, 38) }
                                    });
                                    naver.maps.Event.addListener(marker, 'click', function() {
                                        window.ReactNativeWebView.postMessage(JSON.stringify(item.id));
                                    });
                                    marker.category = item.type;
                                    markerObjects.push(marker);
                                });
                            }
                            window.filterMarkers = function(type) {
                                markerObjects.forEach(function(marker) {
                                    if (type === "ALL" || marker.category === type) marker.setMap(map);
                                    else marker.setMap(null);
                                });
                            }
                        </script>
                    </body>
                </html>
            `,
        [ncpKeyId]
    );

    return (
        <View style={styles.container}>
            <WebView ref={webViewRef} originWhitelist={["*"]} source={{ html: mapHtml, baseUrl: "http://localhost:8081" }} onMessage={onMessage} javaScriptEnabled domStorageEnabled scrollEnabled={false} />

            {/* 상단 탭 필터 */}
            <View className="absolute top-14 left-0 right-0 items-center px-4">
                <View className="flex-row bg-white rounded-full px-1.5 py-1.5 shadow-lg border border-neutral-100">
                    {[
                        { id: "ALL", label: "전체", icon: Layers },
                        { id: "CAFE", label: "카페", icon: Coffee },
                        { id: "FOOD", label: "맛집", icon: Utensils },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                                setCategory(item.id);
                                webViewRef.current?.injectJavaScript(`window.filterMarkers("${item.id}")`);
                            }}
                            className={`flex-row items-center px-5 py-3 rounded-full mx-0.5 ${category === item.id ? "bg-neutral-900" : "bg-transparent"}`}
                        >
                            <item.icon size={14} color={category === item.id ? "white" : "#737373"} strokeWidth={2.5} />
                            <Text className={`ml-1.5 text-[13px] font-bold ${category === item.id ? "text-white" : "text-neutral-500"}`}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* 하단 상세 정보 모달 */}
            <Modal animationType="slide" transparent visible={isModalVisible}>
                <View className="flex-1 justify-end bg-black/40">
                    <View className="bg-white rounded-t-[28px] pb-10 shadow-2xl">
                        <View className="w-10 h-1 bg-neutral-200 rounded-full self-center mt-3 mb-1" />

                        {selectedPlace && (
                            <View className="p-5">
                                {/* [섹션 1] 메인 정보: 이미지 예외 처리 포함 */}
                                <View className="flex-row items-start gap-4 mb-6">
                                    <View className="w-24 h-24 rounded-2xl bg-neutral-100 overflow-hidden relative border border-neutral-100 items-center justify-center">
                                        {selectedPlace.img ? (
                                            <Image source={{ uri: selectedPlace.img }} className="w-full h-full" />
                                        ) : (
                                            <View className="items-center">
                                                <Layers size={24} color="#CBD5E1" />
                                                <Text className="text-neutral-400 text-[10px] font-bold mt-1">이미지 준비중</Text>
                                            </View>
                                        )}
                                        {selectedPlace.isOpen === false && (
                                            <View className="absolute inset-0 bg-black/40 items-center justify-center">
                                                <Text className="text-white text-[12px] font-black">준비 중</Text>
                                            </View>
                                        )}
                                    </View>

                                    <View className="flex-1 h-24 justify-between py-0.5">
                                        <View>
                                            <View className="flex-row justify-between items-center mb-1">
                                                <Text className="text-neutral-900 text-[19px] font-bold flex-1" numberOfLines={1}>
                                                    {selectedPlace.name}
                                                </Text>
                                                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                                    <X size={20} color="#CBD5E1" />
                                                </TouchableOpacity>
                                            </View>
                                            <Text className="text-neutral-500 text-[13px]" numberOfLines={1}>
                                                {selectedPlace.desc}
                                            </Text>
                                        </View>

                                        <View className="flex-row items-center justify-between">
                                            <View className="flex-row items-center">
                                                <Star size={14} color="#F97316" fill="#F97316" />
                                                <Text className="ml-1 text-neutral-900 font-bold text-[14px]">{selectedPlace.score}</Text>
                                                <Text className="ml-1.5 text-neutral-400 text-[12px]">({selectedPlace.review})</Text>
                                                <View className="mx-2 w-px h-3 bg-neutral-200" />
                                                <Text className="text-neutral-500 text-[12px]">{selectedPlace.type === "CAFE" ? "카페" : "맛집"}</Text>
                                            </View>
                                            <View className={`px-2 py-0.5 rounded border ${selectedPlace.isOpen !== false ? "bg-green-50 border-green-100" : "bg-neutral-50 border-neutral-200"}`}>
                                                <Text className={`text-[10px] font-bold ${selectedPlace.isOpen !== false ? "text-green-600" : "text-neutral-400"}`}>{selectedPlace.isOpen !== false ? "영업 중" : "준비 중"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* [섹션 2] 뱃지 영역 */}
                                <View className="flex-row gap-x-2 mb-6">
                                    {(selectedPlace.tags || []).map((tag: string, i: number) => (
                                        <View key={i} className="bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                                            <Text className="text-neutral-500 text-[11px] font-bold">#{tag}</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* [섹션 3] 주소 및 운영시간 리스트 */}
                                <View className="px-1 gap-y-4 mb-8">
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1 pr-4">
                                            <MapPin size={16} color="#94A3B8" />
                                            <Text className="ml-3 text-neutral-700 font-medium text-[14px]" numberOfLines={1}>
                                                {selectedPlace.address}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => copyToClipboard(selectedPlace.address)}>
                                            <Text className="text-blue-500 text-[12px] font-bold">복사</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Clock size={16} color="#94A3B8" />
                                        <Text className="ml-3 text-neutral-700 font-medium text-[14px]">매일 {selectedPlace.time}</Text>
                                    </View>
                                </View>

                                {/* [섹션 4] 액션 버튼 */}
                                <View className="flex-row gap-x-3">
                                    <TouchableOpacity className="w-14 h-14 bg-neutral-100 rounded-xl items-center justify-center border border-neutral-200">
                                        <Heart size={24} color="#EF4444" strokeWidth={2} />
                                    </TouchableOpacity>
                                    <TouchableOpacity className="flex-1 h-14 bg-neutral-900 rounded-xl items-center justify-center" onPress={() => setIsModalVisible(false)}>
                                        <Text className="text-white font-bold text-[16px]">상세 정보 보기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
});

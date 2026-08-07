import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: "#1a1a1a",
    },
    name: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center",
        marginBottom: 4,
    },
    contact: {
        fontSize: 9,
        textAlign: "center",
        color: "#444444",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 700,
        borderBottom: "1px solid #333333",
        marginTop: 10,
        marginBottom: 6,
        paddingBottom: 2,
        textTransform: "uppercase",
    },
    summaryText: {
        fontSize: 9.5,
        lineHeight: 1.4,
    },
    entryTitle: {
        fontSize: 10,
        fontWeight: 700,
    },
    entrySubtitle: {
        fontSize: 9,
        color: "#333333",
        marginBottom: 3,
    },
    bulletRow: {
        flexDirection: "row",
        marginBottom: 2,
    },
    bulletDot: {
        width: 10,
        fontSize: 9.5,
    },
    bulletText: {
        fontSize: 9.5,
        flex: 1,
        lineHeight: 1.4,
    },
    skillsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
    },
    skillPill: {
        fontSize: 8.5,
        border: "1px solid #999999",
        borderRadius: 3,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginRight: 4,
        marginBottom: 4,
    },
    entryBlock: {
        marginBottom: 8,
    },
});

const ResumePDF = ({ resume }: { resume: ImprovedResume }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <Text style={styles.name}>{resume.name}</Text>
                <Text style={styles.contact}>
                    {[
                        resume.contact?.location,
                        resume.contact?.phone,
                        resume.contact?.email,
                        resume.contact?.linkedin,
                        resume.contact?.github,
                    ]
                        .filter(Boolean)
                        .join("  |  ")}
                </Text>

                {/* Summary */}
                {resume.summary && (
                    <View>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <Text style={styles.summaryText}>{resume.summary}</Text>
                    </View>
                )}

                {/* Education */}
                {resume.education?.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {resume.education.map((edu, i) => (
                            <View key={i} style={styles.entryBlock}>
                                <Text style={styles.entryTitle}>{edu.institution}</Text>
                                <Text style={styles.entrySubtitle}>
                                    {edu.degree} {edu.duration ? `— ${edu.duration}` : ""}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {resume.experience?.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {resume.experience.map((exp, i) => (
                            <View key={i} style={styles.entryBlock}>
                                <Text style={styles.entryTitle}>{exp.title}</Text>
                                <Text style={styles.entrySubtitle}>
                                    {exp.organization} {exp.duration ? `— ${exp.duration}` : ""}
                                </Text>
                                {exp.bullets?.map((bullet, j) => (
                                    <View key={j} style={styles.bulletRow}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{bullet}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* Projects */}
                {resume.projects?.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {resume.projects.map((proj, i) => (
                            <View key={i} style={styles.entryBlock}>
                                <Text style={styles.entryTitle}>{proj.title}</Text>
                                {proj.bullets?.map((bullet, j) => (
                                    <View key={j} style={styles.bulletRow}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{bullet}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {resume.skills?.length > 0 && (
                    <View>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        <View style={styles.skillsWrap}>
                            {resume.skills.map((skill, i) => (
                                <Text key={i} style={styles.skillPill}>
                                    {skill}
                                </Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ResumePDF;